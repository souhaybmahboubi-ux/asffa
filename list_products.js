
async function listProducts() {
  const domain = 'tufnkz-ng.myshopify.com';
  const token = 'd05cfe7362d9b5a91fc2c2355d40bda3';

  const query = `
    {
      products(first: 20) {
        edges {
          node {
            id
            title
            handle
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(`https://${domain}/api/2023-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token
    },
    body: JSON.stringify({ query })
  });

  const json = await response.json();
  console.log(JSON.stringify(json, null, 2));
}

listProducts();
