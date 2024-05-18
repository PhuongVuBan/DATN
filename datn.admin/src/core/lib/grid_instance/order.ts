import { Grid } from "../common/grid";

export class Order extends Grid {
    /** Hàm load dữ liệu lên table 
   * HAN - 08.03.2023
   * */
  public loadData = async (filter: any = undefined) => {
    try{
      if(filter && filter.resetPage){
        this.recordSelectPaging.value = 0;
        filter.v_Offset = this.recordSelectPaging.value;
      }
      if (filter) {
        if(filter !== true){
          await this.store.dispatch(`${this.Module}/setFilterAction`, filter);
        }
      }
      this.isShowLoaderTable.value = true;
      const columnSelect = this.columns.value.reduce((acc: any, cur: any) => {
        if(cur.IsShow){
          return [...acc, cur.FieldSelect];
        }
      },[])
      
      await this.apiService.callApi(this.api.getRecordList, { v_Select: columnSelect, ...this.store.state[`${this.Module}`].filter, v_OrderStatus: filter.v_OrderStatus }, (response: any) => { 
        if(!this.tree){
          this.store.dispatch(`${this.Module}/getRecordListAction`, response);
        }
        else{
          this.store.dispatch(`${this.Module}/getRecordListAction`, { recordList: this.listToTree(response.recordList, this.tree), totalCount: response.totalCount });
        }
      });
      this.isShowLoaderTable.value = false;
    }
    catch(e){
      console.log(e);
    }
  }
}