class ObjectUtils {
    clean(obj: any) {
      return Object.entries(obj).reduce(
        (result, [key, value]) => {
          if (value === undefined) {
            return result;
          }
  
          if (this.getType(value) === 'Object' && Object.getPrototypeOf(value).constructor.name === 'Object') {
            result[key] = this.clean(value);
          } else {
            result[key] = value;
          }
          return result;
        },
        {} as any
      );
    }
  
    getType(obj: any) {
      return Object.prototype.toString.call(obj).slice(8, -1);
    }
  }
  
  export const objectUtils = new ObjectUtils();
  