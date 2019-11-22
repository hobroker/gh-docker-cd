const parse = value => JSON.parse(value);

export const parseJsonOutput = output => output.split`\n`.map(parse);
