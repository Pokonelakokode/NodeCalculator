import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
// tslint:disable-next-line:no-var-requires
require("jest-fetch-mock").enableMocks();
configure({ adapter: new Adapter() });
