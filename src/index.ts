import crypto from "crypto";

export interface ISingletonClassCtl<Args extends any[]> {
  clear(): void;
  clear(...args: Args): void;
}

const isPrimitive = (value: unknown): boolean => {
  if (typeof value === "string") {
    return true;
  }
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "boolean") {
    return true;
  }
  return false;
};

const getHash = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const singleton = <ClassType extends new (...args: any[]) => any>(
  ClassCtor: ClassType
): ClassType & ISingletonClassCtl<ConstructorParameters<ClassType>> => {
  const instanceMap = new Map<string, InstanceType<ClassType>>();

  const activateInstance = (...args: ConstructorParameters<ClassType>) => {
    if (args.some((value) => !isPrimitive(value))) {
      throw new Error(`di-singleton activateInstance not serializable arguments: ${JSON.stringify(args)}`);
    }
    const instanceKey = getHash(args.join("-"));
    let instance = instanceMap.get(instanceKey);
    if (!instance) {
      instance = new ClassCtor(...args);
      instanceMap.set(instanceKey, instance!);
    }
    return instance as InstanceType<ClassType>;
  };

  function ClassActivator(...args: ConstructorParameters<ClassType>) {
    return activateInstance(...args);
  }

  ClassActivator.clear = (...args: any[]) => {
    if (args.length) {
      if (args.some((value) => !isPrimitive(value))) {
        throw new Error(`di-singleton ClassActivator.clear not serializable arguments: ${JSON.stringify(args)}`);
      }
      const instanceKey = getHash(args.join("-"));
      instanceMap.delete(instanceKey);
      return;
    }
    instanceMap.clear();
  };

  return ClassActivator as unknown as ClassType & ISingletonClassCtl<ConstructorParameters<ClassType>>;
};
