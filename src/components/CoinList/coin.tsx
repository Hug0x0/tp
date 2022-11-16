import { NavLink } from "react-router-dom";
import { fetchCoins } from "../../services/api/api";

const CoinsList = styled.ul``;

export type Cointypes = {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

function Coins() {
  const { isLoading, data } = useQuery<Cointypes[]>(['allCoins'], fetchCoins)
  return (
    <div>
        <title>
          Coin Tracker
        </title>
        <title>Coin Tracker</title>
      {isLoading ? <Loader>Loading...</Loader> : <CoinsList>
        {data?.map((coin) => (
          <Coin key={coin.id}>
            <NavLink to={`/${coin.id}`} state={{ name: coin.name }}>
              <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
              {coin.name}</NavLink>
          </Coin>
        ))}
      </CoinsList>}
    </div>
  );
}

export default Coins