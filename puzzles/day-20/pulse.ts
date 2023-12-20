type Component = {
  name: string;
  type: "broadcaster" | "%" | "&" | undefined;
  inputs: string[];
  outputs: string[];
  state: boolean;
};

type Schema = Record<string, Component>

type Pulse = { from: string; to: string; val: boolean; };

export type PulseQueue = Pulse[];

export const parseSchema = (data: string[]): Schema => {
  return data.filter(Boolean).reduce((s, l) => {
    let { groups: { type, name, connections } } = l.match(/(?<type>[&%])?(?<name>\w+) -> (?<connections>.*)$/)

    if (name === "broadcaster") type = name;

    const outputs = connections.split(", ");
    for (const output of outputs) {
      if (s[output]) { s[output].inputs.push(name); }
      else { s[output] = { name: output, inputs: [name] } }
    }

    return {...s, [name]: { name, type, outputs, inputs: s[name]?.inputs || [] }};
  }, {});
};

export const sendPulse = (schema: Schema, pulseQueue: PulseQueue, pulse: Pulse) => {
  const component = schema[pulse.to];
  switch (component.type) {
    case undefined: break;
    case "broadcaster":
      for (const output of component.outputs) {
        pulseQueue.push({ from: component.name, to: output, val: pulse.val })
      }
      break;
    case "%":
      if (!pulse.val) {
        component.state = !component.state;
        for (const output of component.outputs) {
          pulseQueue.push({ from: component.name, to: output, val: component.state })
        }
      }
      break;
    case "&":
      component.state = false;
      for (const input of component.inputs) {
        if (!schema[input].state) {
          component.state = true;
          break;
        }
      }

      for (const output of component.outputs) {
        pulseQueue.push({ from: component.name, to: output, val: component.state })
      }
      break;
  }
}
