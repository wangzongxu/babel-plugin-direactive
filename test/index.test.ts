import { transformFileSync, transformSync } from '@babel/core';
import { join } from 'path';
import { readdirSync, readFileSync, existsSync } from 'fs';
import plugin from '../src/index';

describe('index', () => {
  const fixturesDir = join(__dirname, 'fixtures');
  let fixtures = readdirSync(fixturesDir);
  const onlyFixtures = fixtures.filter(fixture => fixture.indexOf('-only') > -1);

  if (onlyFixtures.length) {
    fixtures = onlyFixtures;
  }

  fixtures.forEach(caseName => {
    const fixtureDir = join(fixturesDir, caseName);
    const actualFile = join(fixtureDir, 'actual.js');
    const expectedFile = join(fixtureDir, 'expected.js');
    const errorFile = join(fixtureDir, 'error.js');

    it(`should work with ${caseName}`, () => {
      const actual = transformFileSync(actualFile, {
        presets: ['@babel/preset-react'],
        plugins: [[plugin]],
      })!.code!;

      if (onlyFixtures.length) {
        // eslint-disable-next-line no-console
        console.warn(actual);
      }

      const expected = readFileSync(expectedFile, 'utf-8');
      expect(actual.trim()).toEqual(expected.trim());
    });

    if (!existsSync(errorFile)) {
      return;
    }

    // eslint-disable-next-line import/no-dynamic-require
    const errors = require(errorFile); // eslint-disable-line global-require
    Object.keys(errors).forEach(cause => {
      const { source, error } = errors[cause];
      it(`should throw when ${caseName} ${cause}`, () => {
        expect(
          () =>
            transformSync(source, {
              presets: ['@babel/preset-react'],
              plugins: [[plugin]],
            })!.code!,
        ).toThrow(error);
      });
    });
  });
});
