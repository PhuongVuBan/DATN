import { Cart, EntitySystem, StorageService } from "@/core/public_api";

const config = {
	namespaced: true,
	state: () => {
		return {
			cart: new Cart(),
			keyWord: '',
			currentUser: StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser) ? 
			JSON.parse(StorageService.getItemWithSystemConstants(EntitySystem.CurrentUser)) : StorageService.createCurrentUser(),
		};
	},
	mutations: {
		setKeyWordMutation(state: any, payload: any){
			state.keyWord = payload;
		},
		setCartMutation(state: any, payload: any){
			state.cart = payload;
		}
	},
	actions: {
		setKeyWordAction(context: any, payload: any){
			context.commit("setKeyWordMutation", payload);
		},
		setCartAction(context: any, payload: any){
			context.commit("setCartMutation", payload);
		}
	},
};
export default config;
  