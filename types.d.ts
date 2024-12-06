declare const singleton: <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => ClassType;

export { singleton };
