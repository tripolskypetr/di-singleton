const NEVER_VALUE = Symbol('never');

export const singleton = <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => {

  let instance: typeof NEVER_VALUE | InstanceType<ClassType> = NEVER_VALUE;

  const activateInstance = (...args: ConstructorParameters<ClassType>) => {
    if (instance === NEVER_VALUE) {
      instance = new ClassCtor(...args);
      // @ts-ignore
      instance.init && instance.init();
    }
    return instance as InstanceType<ClassType>;
  };

  function ClassActivator(...args: ConstructorParameters<ClassType>) {
    return activateInstance(...args);
  }

  return ClassActivator as unknown as ClassType;
};
