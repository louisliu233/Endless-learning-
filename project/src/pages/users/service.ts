import request, { extend } from 'umi-request';
import { message } from 'antd';


const errorHandler = function(error: any) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    if(error.response.status > 400) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('Network Error');
  }

  throw error;
  
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const getRemoteList = async () => {
  return extendRequest('http://public-api-v1.aspirantzhang.com/users', {
    method: 'get',
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      return false;
    });

}

export const editRecord = async ({values, id}: any) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'put',
    data: values,
  })
    .then(function(response) {
     return true;
    })
    .catch(function(error) {
      return false;
    });

}

export const deleteUser = async (id: any) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users/${id}`, {
    method: 'delete',
  })
  .then(function(response) {
    return true;
   })
   .catch(function(error) {
     return false;
   });

}

export const addUser = async (values: any) => {
  return extendRequest(`http://public-api-v1.aspirantzhang.com/users`, {
    method: 'post',
    data: values,
  })
  .then(function(response) {
    return true;
   })
   .catch(function(error) {
     return false;
   });

}

