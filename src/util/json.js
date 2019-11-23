const parse = value => JSON.parse(value);

/**
 * @param {String} output
 * @param {String} [splitter='\n']
 * @returns {Array<Object>}
 */
export const parseJsonOutput = (output, splitter = '\n') =>
  !output ? [] : output.split(splitter).map(parse);
