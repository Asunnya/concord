interface Pages<T> {
    elementSize:number;
    pageSize: number;
    currentPage: number;
    items: T[];

}

export default Pages;