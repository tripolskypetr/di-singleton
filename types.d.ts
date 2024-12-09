declare const singleton: <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => ClassType & {
    clear(): void;
    clear(...args: ConstructorParameters<ClassType>): void;
};

export { singleton };
