interface ISingletonClassCtl<Args extends any[]> {
    clear(): void;
    clear(...args: Args): void;
}
declare const singleton: <ClassType extends new (...args: any[]) => any>(ClassCtor: ClassType) => ClassType & ISingletonClassCtl<ConstructorParameters<ClassType>>;

export { singleton };
