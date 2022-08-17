import '@testing-library/jest-dom';
import MatchMediaMock from 'jest-matchmedia-mock';
new MatchMediaMock();
// import type { ImageProps } from 'next/image';
// import { server } from './test-utils/server';

// beforeAll(() => server.listen());
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());

jest.mock('next/config', () => () => ({
  serverRuntimeConfig: {
    secret: 'secret',
  },
}));

jest.mock('next/router', () => ({
  ...require('next-router-mock'),
  back: jest.fn(),
}));

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// jest.mock('next/image', () => (props: ImageProps) => (
//   <img {...props} src="mock" alt="mock" />
// ));
