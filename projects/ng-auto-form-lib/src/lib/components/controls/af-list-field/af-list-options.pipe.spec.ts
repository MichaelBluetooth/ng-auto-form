import { AfListOptionsPipe } from './af-list-options.pipe';

describe('AfListOptionsPipe', () => {
    const pipe: AfListOptionsPipe = new AfListOptionsPipe();

    it('should transform arrays of string into name/value pairs', () => {
        expect(pipe.transform(['red', 'blue', 'green']))
            .toEqual([{ display: 'red', value: 'red' }, { display: 'blue', value: 'blue' }, { display: 'green', value: 'green' }]);
    });

    it('should transform arrays of numbers into name/value pairs', () => {
        expect(pipe.transform([3, 2, 4]))
            .toEqual([{ display: 3, value: 3 }, { display: 2, value: 2 }, { display: 4, value: 4 }]);
    });

    it('should transform arrays of objects into name/value pairs using the given displayNameField and valueField ', () => {
        expect(pipe.transform([{id: 2222, name: 'firstItem'}, {id: 1111, name: 'secondItem'}], 'name', 'id'))
        .toEqual([{ display: 'firstItem', value: 2222 }, { display: 'secondItem', value: 1111 }]);
    });

    it('should return an empty list when given null', () => {
        expect(pipe.transform(null)).toEqual([]);
    });
});
