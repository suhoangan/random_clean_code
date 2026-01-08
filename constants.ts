import { CleanCodeExample } from './types';

export const EXAMPLES: CleanCodeExample[] = [
  {
    id: '1',
    title: 'Meaningful Variable Names',
    category: 'Variables',
    principle: 'Use searchable, descriptive names. Avoid single-letter variables that force the reader to map context mentally.',
    bad: {
      code: `const yyyymmdstr = moment().format("YYYY/MM/DD");\n\n// What does 'd' stand for?\nconst d = new Date();\nconst diff = d - 3;`
    },
    good: {
      code: `const currentDate = moment().format("YYYY/MM/DD");\n\nconst now = new Date();\nconst threeDaysAgo = now - 3;`
    }
  },
  {
    id: '2',
    title: 'Function Arguments',
    category: 'Functions',
    principle: 'Limit function arguments to 2 or fewer. If you need more, use an object parameter (destructuring).',
    bad: {
      code: `function createMenu(title, body, buttonText, cancellable) {\n  // ...\n}\n\ncreateMenu("Foo", "Bar", "Baz", true);`
    },
    good: {
      code: `interface MenuConfig {\n  title: string;\n  body: string;\n  buttonText: string;\n  cancellable: boolean;\n}\n\nfunction createMenu({ title, body, buttonText, cancellable }: MenuConfig) {\n  // ...\n}\n\ncreateMenu({\n  title: "Foo",\n  body: "Bar",\n  buttonText: "Baz",\n  cancellable: true\n});`
    }
  },
  {
    id: '3',
    title: 'Functions Should Do One Thing',
    category: 'Functions',
    principle: 'Functions should do one thing and do it well. This reduces complexity and makes testing easier.',
    bad: {
      code: `function emailClients(clients: Client[]) {\n  clients.forEach((client) => {\n    const clientRecord = database.lookup(client);\n    if (clientRecord.isActive()) {\n      email(client);\n    }\n  });\n}`
    },
    good: {
      code: `function emailActiveClients(clients: Client[]) {\n  clients.filter(isActiveClient).forEach(email);\n}\n\nfunction isActiveClient(client: Client) {\n  const clientRecord = database.lookup(client);\n  return clientRecord.isActive();\n}`
    }
  },
  {
    id: '4',
    title: 'Use Default Arguments',
    category: 'Variables',
    principle: 'Use ES6 default arguments instead of short-circuiting or conditionals inside the function.',
    bad: {
      code: `function createMicrobrewery(name) {\n  const breweryName = name || "Hipster Brew Co.";\n  // ...\n}`
    },
    good: {
      code: `function createMicrobrewery(name: string = "Hipster Brew Co.") {\n  // ...\n}`
    }
  },
  {
    id: '5',
    title: 'Avoid Side Effects',
    category: 'Functions',
    principle: 'Functions should not modify external state or variables passed to them if possible. Return new values instead.',
    bad: {
      code: `let name = "Ryan McDermott";\n\nfunction splitIntoFirstAndLastName() {\n  name = name.split(" ");\n}\n\nsplitIntoFirstAndLastName();\nconsole.log(name); // ['Ryan', 'McDermott'];`
    },
    good: {
      code: `const name = "Ryan McDermott";\n\nfunction splitIntoFirstAndLastName(name: string) {\n  return name.split(" ");\n}\n\nconst newName = splitIntoFirstAndLastName(name);\nconsole.log(name); // 'Ryan McDermott';\nconsole.log(newName); // ['Ryan', 'McDermott'];`
    }
  },
  {
    id: '6',
    title: 'Encapsulate Conditionals',
    category: 'Variables',
    principle: 'Extract complex conditions into variables or functions to make the logic readable.',
    bad: {
      code: `if (fsm.state === "fetching" && isEmpty(listNode)) {\n  // ...\n}`
    },
    good: {
      code: `function shouldShowSpinner(fsm, listNode) {\n  return fsm.state === "fetching" && isEmpty(listNode);\n}\n\nif (shouldShowSpinner(fsmInstance, listNodeInstance)) {\n  // ...\n}`
    }
  },
  {
    id: '7',
    title: 'Avoid Flags as Parameters',
    category: 'Functions',
    principle: 'Flags tell your user that this function does more than one thing. Split them into two functions.',
    bad: {
      code: `function createFile(name: string, temp: boolean) {\n  if (temp) {\n    fs.create(\`./temp/\${name}\`);\n  } else {\n    fs.create(name);\n  }\n}`
    },
    good: {
      code: `function createFile(name: string) {\n  fs.create(name);\n}\n\nfunction createTempFile(name: string) {\n  createFile(\`./temp/\${name}\`);\n}`
    }
  }
];