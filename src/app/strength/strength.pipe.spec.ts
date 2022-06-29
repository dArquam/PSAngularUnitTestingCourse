import { StrengthPipe } from "./strength.pipe"

describe('StrengthPipe',()=>{
    it('should be weak if value is less than 10',()=>{
        let strengthPipe = new StrengthPipe();
        expect(strengthPipe.transform(5)).toEqual('5 (weak)')

    })
    it('should be strong if value is >= than 10 and <=20',()=>{
        let strengthPipe = new StrengthPipe();
        expect(strengthPipe.transform(10)).toEqual('10 (strong)')

    })
})