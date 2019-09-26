jest.setTimeout(20*1000);
const frisby = require('frisby');
const Joi = frisby.Joi;


const BASE_URL = 'http://localhost:3001';
const GET_ALL_USERS = BASE_URL + '/tasks';


let successResponse = Joi.array().items(
  Joi.object().keys({
        'Name': Joi.string().required(),
        'Type': Joi.string().required(),
        'Favorite': Joi.string().required(),
    }).options({stripUnknown: true}).required()
).min(0).required();

describe('Get All Users and tasks Test',() => {
  it('Should Users and tasks with response code 200' , (done)=> {
    frisby
    .timeout(60*1000)
    .get(GET_ALL_USERS)
    .expect('status', 200)
    .inspectRequest()
    .inspectJSON()
    .expect('jsonTypes', successResponse)
    // .then((res) => { })
    .done(done);
  });
});
