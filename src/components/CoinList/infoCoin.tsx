import { useQuery } from "@tanstack/react-query";
import {
  Link,
  Outlet,
  useLocation,
  useMatch,
  useParams,
} from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../../services/api/api";
import { Container, Header, Loader } from "./coin";

const Title = `
  font-size: 48px;
  align-items: center;
`;
const Overview = `
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = `
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = `
  margin: 20px 0px;
`;
const Tabs = `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = `
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props: { isActive: any; theme: { accentColor: any; textColor: any; }; }) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

type RouteParams = {
  coinId: string;
};

type LocationState = {
  state: {
    name: string;
    rank: number;
  };
};

type InfoData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
};

type PriceData = {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
};
export default function Coin() {
  const { coinId = "" } = useParams<RouteParams>();
  const { state } = useLocation() as LocationState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoding, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId),
    {
      refetchInterval: 5000,
    }
  ); //
  const { isLoading: tickersLoding, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId)
  );

  const loading = infoLoding || tickersLoding;
  return (
    <div>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      <Link to={`/`}>
        <button>{"RETOUR A LA LISTE"}</button>
      </Link>

      <Header>
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Header>

      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <div>
            <div>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </div>
            <div>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </div>
            <div>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(0)}</span>
            </div>
          </div>
          <h2>{infoData?.description}</h2>
          <div>
            <div>
              <span>Total Supply:</span>
              <span>{tickersData?.total_supply}</span>
            </div>
            <div>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </div>
          </div>
          <Outlet context={coinId} />
        </>
      )}
    </div>
  );
}