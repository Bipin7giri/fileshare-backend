// import { BrokerService } from "../broker/broker.service";
// import { CompanyService } from "../company/company.service";
// import { ScrapAll } from "../scrap";
// import { ScrapAll } from "../scrap";
import { AppDataSource } from "./database.config";
export const connectDb = (): void => {
  AppDataSource.initialize()
    .then(async () => {
      // await ScrapAll();
      // const brokerService = new BrokerService();
      // const data = await brokerService.findOneByBrokerId(22);
      // console.log(data);
      // const companyService = new CompanyService();
      // await brokerService.createMany();
      // await companyService.createMany();
      console.log("connected to Database");
    })
    .catch((error) => {
      console.log(error);
    });
};
