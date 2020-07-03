export abstract class CRUD_ServiceDTO {
    public static GetAll: string = 'GetAll';
    public static GetAll2: string = 'GetAll2';
    public static Filter: string = 'Filter';


    public static GetWithCondition: string = 'GetWithCondition';
    public static GetById: string = 'GetById/';
    public static GetByCode: string = 'GetByCode/';
    public static Insert: string = 'Insert';
    public static BulkInsert: string = 'BulkInsert';
    public static Update: string = 'Update';
    public static Patch: string = 'Patch';
    public static DeleteModel: string = 'Delete';
    public static BulkDelete: string = 'BulkDelete';
    public static DeleteById: string = 'Delete/';
}
