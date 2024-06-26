// import superagent from 'superagent';
import config from '@plone/volto/registry';
import Api from './Api';

// jest.mock('react-cookie', () => ({
//   load: jest.fn(() => 'token'),
// }));
//

jest.mock('superagent', () => ({
  get: jest.fn((url) => ({
    redirects: jest.fn(() => ({
      url,
      query: jest.fn(),
      set: jest.fn(),
      type: jest.fn(),
      send: jest.fn(),
      end: jest.fn(),
    })),
  })),
}));

beforeAll(() => {
  config.settings.legacyTraverse = true;
});

const api = new Api();
const { settings } = config;

test('get request', () => {});

describe('Api', () => {
  it('prefixes relative path', () => {
    const promise = api.get('');
    expect(promise.request.url).toBe(`${settings.apiPath}/`);
  });
  it('does not prefix absolute path', () => {
    const promise = api.get('/test');
    expect(promise.request.url).toBe(`${settings.apiPath}/test`);
  });
  it('does not change http URL provided as path', () => {
    const promise = api.get('http://example.com');
    expect(promise.request.url).toBe('http://example.com');
  });
  it('does not change https URL provided as path', () => {
    const promise = api.get('https://example.com');
    expect(promise.request.url).toBe('https://example.com');
  });
});
