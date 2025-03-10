/**
 * The Singleton class defines the `getInstance` method that lets clients access
 * the unique singleton instance.
 */
import { IEditorConfig } from '../types';

export default class AppConfig {
  private static instance: AppConfig;
  private config: IEditorConfig;
  private constructor() {}
  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
  public setConfig(config: IEditorConfig) {
    this.config = config;
  }
  public getConfig(): IEditorConfig {
    return this.config;
  }
}
