import request from '@/utils/request';

function list ()
{
  return request<unknown[]>( {
    method: 'get',
    url: 'https://jsonplaceholder.typicode.com/users'
  })
};

export { list }
