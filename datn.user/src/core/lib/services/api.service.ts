/**
 * Chứa các Api service
 * HAN - 08.03.2023
 */
import { useStore } from "vuex";
import { ENotificationType, EntitySystem, StatusCode, StorageService } from "@/core/public_api";

export class ApiService {
  /** Store vuex */
  public Store: any = useStore();
  
  /** Hàm gọi api */
  public async callApi(Api: Function, data?: any, thenApi?: Function, noLoaderAnimation: boolean = true, catchApi?: Function) {
    if(!noLoaderAnimation){
      this.Store.dispatch("config/setToggleShowLoaderAction");
    }
    await Api(data)
      .then((response: any) => {
        if(!noLoaderAnimation){
          this.Store.dispatch("config/setToggleShowLoaderAction");
        }
        if(response.success || response.Success){
          if(thenApi){
            if(response.data){
              thenApi(response.data);
            }
            else if(response.Data){
              thenApi(response.Data);
            }
            else{
              thenApi(response);
            }
          }
        }
        else{
          if(catchApi){
            catchApi(response);
          }
          else{
            if(response.Data){
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: `${response.Data.UserMsg}`
              });
            }
            else if(response.data){
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: `${response.data.userMsg}`
              });
            }
            else{
              this.Store.dispatch("config/addNotification", {
                type: ENotificationType.Error,
                message: `Có lỗi xảy ra`
              });
            }
          }
        }
      })
      .catch((response: any) => {
        if(response.response.status === StatusCode.Authentication){
          this.Store.dispatch("config/setToggleShowNotificationErrorAction", {display: `Có lỗi xảy ra`, callBack: async () => {
            await StorageService.removeItemWithSystemConstants(EntitySystem.CurrentUser);
            window.location.href = '/login';
          }});
        }
        else if(catchApi){
          catchApi(response);
        }
        else{
          this.Store.dispatch("config/addNotification", {
            type: ENotificationType.Error,
            message: 'Có lỗi xảy ra'
          });
        }
        if(!noLoaderAnimation){
          this.Store.dispatch("config/setToggleShowLoaderAction");
        }
      });
  }
}