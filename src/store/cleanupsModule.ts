import {Action, Module, VuexModule} from "vuex-class-modules";
import Cleanup from "@/types/Cleanup";
import {cleanupsProvider} from "@/providers/data/cleanups.provider";
import {store} from "@/store/index";

@Module
class CleanupsModule extends VuexModule {

    constructor() {
        super({store, name: 'cleanups'})
    }

    @Action
    publish(cleanup: Cleanup) {
        return cleanupsProvider.publish(cleanup)
    }

}

export const cleanupsModule = new CleanupsModule()