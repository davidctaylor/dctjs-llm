// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const baseFetch = async (url: string, options: any): Promise<unknown> => {
  const response = await fetch(url, {
    ...options,
  });

  console.log('XXX opt', url, options);
  
  console.log('XXX resp:', response.status, response.statusText);
  console.log('XXX resp:', response);
  // if (!response.ok) {
  //   throw new Error(`invalid network response: ${url}`);
  // }

  return response;
};
