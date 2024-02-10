interface Config {
  headers: {
    Authorization: string;
    'Content-Type': string;
  };
}

export const createConfig = (token: string): Config => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};