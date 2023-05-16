const Validator = require('../Validator');
const expect = require('chai').expect;

describe('testing-configuration-logging/unit-tests', () => {
  describe('Validator', () => {
    it('валидатор проверяет строковые поля', () => {
      const validator = new Validator({
        name: {
          type: 'string',
          min: 10,
          max: 20,
        },
      });

      const errorType = validator.validate({ name: false });

      expect(errorType).to.have.length(1);
      expect(errorType[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorType[0]).to.have.property('error').and.to.be.equal('expect string, got boolean');


      const errorMinName = validator.validate({name: "testname"})

      expect(errorMinName).to.have.length(1);
      expect(errorMinName[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorMinName[0]).to.have.property('error').and.to.be.equal('too short, expect 10, got 8')

      const errorMaxName = validator.validate({name: "test-test-test-test-test-te"})

      expect(errorMaxName).to.have.length(1);
      expect(errorMaxName[0]).to.have.property('field').and.to.be.equal('name');
      expect(errorMaxName[0]).to.have.property('error').and.to.be.equal('too long, expect 20, got 27');


      const noError = validator.validate({name: "test-name-test"})

      expect(noError).to.have.length(0);
    });

  


  

    it('валидатор проверяет цифровые поля', () => {
      const validator = new Validator({
        age: {
          type: 'number',
          min: 18,
          max: 27,
        },
      });

      const errorType = validator.validate({ age: false });

      expect(errorType).to.have.length(1);
      expect(errorType[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorType[0]).to.have.property('error').and.to.be.equal('expect number, got boolean');


      const errorMinName = validator.validate({age: 9})

      expect(errorMinName).to.have.length(1);
      expect(errorMinName[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorMinName[0]).to.have.property('error').and.to.be.equal('too little, expect 18, got 9')

      const errorMaxName = validator.validate({age: 28})

      expect(errorMaxName).to.have.length(1);
      expect(errorMaxName[0]).to.have.property('field').and.to.be.equal('age');
      expect(errorMaxName[0]).to.have.property('error').and.to.be.equal('too big, expect 27, got 28');


      const noError = validator.validate({age: 20})

      expect(noError).to.have.length(0);
    });

  });
}); 