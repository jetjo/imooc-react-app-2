import request from '@/utils/request';

function list ()
{
  return request( {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users'
  })
};

export { list }
