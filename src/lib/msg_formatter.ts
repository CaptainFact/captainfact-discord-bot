import MessageFormatterGlobals from "./msg_formatter_globals";

/**
 * Format a template with given vars.
 * @param {string} template - template name. See `AVAILABLE_TEMPLATES`
 * @param {object} vars - an object of values to replace
 */
export default function render(template: StringTemplate.Template, vars = {}) {
  return template(Object.assign(MessageFormatterGlobals, vars));
}
