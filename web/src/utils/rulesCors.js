export const getCors = () => {
  return {
    method: 'GET',
    headers: new Headers({
      'Access-Control-Allow-Headers':'*',
      'Accept': 'application/json',
    }),
  }
}

export const postCors = body => {
  return {
    method: 'POST',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    }),
    body: JSON.stringify(body),
  }
}

export const postFileCors = formData => {
  return {
    method: 'POST',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
    }),
    body: formData,
  }
}

export const deleteCors = body => {
  return {
    method: 'DELETE',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    }),
    body: JSON.stringify(body),
  }
}

export const putCors = body => {
  return {
    method: 'PUT',
    headers: new Headers({
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8',
    }),
    body: JSON.stringify(body),
  }
}