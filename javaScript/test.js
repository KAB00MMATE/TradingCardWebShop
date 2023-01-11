class cartDropdownItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <div class="cart--dropdown-item">

      <a class="cart--dropdown-item-image" href="product.html">
          <img src="..//pictures/placeholderCard.jpg" alt="Place Holder Rick">
      </a>
      <a href="product.html">
          <h3 class="item-title">PlaceHolder Title, Rick Astley Card</h3>
      </a>
      <p class="item-price">Price: 69,99$</p>
      <form action="">
          <label for="">Amount: 1x</label><br>
          <button>➕</button>
          <button>➖</button>
          <button>Remove</button>
      </form>
  </div>
      `;
    }
}

customElements.define('cart-dropdown-item', cartDropdownItem);