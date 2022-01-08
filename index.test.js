import demo from  './index';

describe('index', () => {
    it('should return hello world', () => {
        expect(demo()).toEqual('hello world');
    });
});