export const InitialValues = () => null;
InitialValues.prop = "initialValues";
export const Sections = () => null;
Sections.prop = "sections";
Sections.transform = v => {
  const nodes = Array.isArray(v) ? v : [v];
  const sections = [];
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const node = nodes[i];
    const { children, ...props } = node.props;
    const section = {
      layout: children,
      ...props
    };
    sections.push(section);
  }

  return sections;
};
export const Section = () => null;
export const Fields = () => null;
Fields.prop = "fields";
Fields.transform = v => {
  const nodes = Array.isArray(v) ? v : [v];
  const fields = {};
  for (let i = 0, len = nodes.length; i < len; i += 1) {
    const node = nodes[i];
    const { children, name, ...props } = node.props;
    const field = {
      ...children,
      ...props
    };
    fields[name] = field;
  }

  return fields;
};
export const Field = () => null;
