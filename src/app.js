document.addEventListener("alpine:init", () => {
  Alpine.data("foods", () => ({
    items: [
      {
        id: 1,
        name: "Katsu",
        img: "fd-katsu.jpg",
        price: 21000,
        description:
          "Enak bree pokoknya... Katsu adalah hidangan daging yang dibalut tepung roti, digoreng hingga renyah.",
      },
      {
        id: 2,
        name: "Naci Telor",
        img: "fd-naci telor.jpg",
        price: 22000,
        description:
          "Ini juara sih asli.. Nasi Telor adalah hidangan nasi dengan telor dadar atau ceplok yang disajikan dengan sambal.",
      },
      {
        id: 3,
        name: "Nasgor",
        img: "fd-nasgor.jpg",
        price: 23000,
        description:
          "Lebih enak dari nasgor abang2an.. Nasi Goreng, nasi yang digoreng dengan bumbu rempah yang kaya dan sering disertai dengan ayam atau seafood.",
      },
      {
        id: 4,
        name: "Teriyaki",
        img: "fd-teriyaki.jpg",
        price: 24000,
        description:
          "Lu gen Z bukan? Teriyaki adalah hidangan Jepang dengan daging yang dimasak dengan saus manis dan asin.",
      },
      {
        id: 5,
        name: "Beef Steak",
        img: "fd-beef steak.jpg",
        price: 25000,
        description:
          "Elite paraahh.. Steak daging sapi yang dimasak dengan cara panggang atau bakar.",
      },
    ],
    isModalOpen: false, // untuk mengontrol apakah modal terbuka
    modalItem: null, // untuk menyimpan item yang sedang ditampilkan di modal

    openModal(item) {
      this.modalItem = item; // set item yang akan ditampilkan
      this.isModalOpen = true; // buka modal
    },

    closeModal() {
      this.isModalOpen = false; // tutup modal
      this.modalItem = null; // reset item modal
    },
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(newItem) {
      // cek apa item sudah ada di cart
      const cartItem = this.items.find((item) => item.id === newItem.id);
      // jika belum ada item di cart

      if (!cartItem) {
        this.items.push({ ...newItem, quantity: 1, total: newItem.price });
        this.quantity++;
        this.total += newItem.price;
      } else {
        // jika item sudah ada di cart, cek apakah barang beda atau sama yang ada di cart
        this.items = this.items.map((item) => {
          // jika barang beda
          if (item.id !== newItem.id) {
            return item;
          } else {
            // jika barang sudah ada di cart
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
          
        });
      }
    },
    remove(id) {
      // cari item yang akan dihapus
      const cartItem = this.items.find((item) => item.id === id);
      //  jika item lebih dari satu
      if (cartItem.quantity > 1) {
        // telusuri satu per satu item di cart
        this.items = this.items.map((item) => {
          // jika bukan barang yang diklik
          if(item.id !== id) {
            return item;
          } else {
            // jika barang yang diklik
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        })
      } else if (cartItem.quantity === 1) {
        // jika item hanya satu
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= cartItem.price;
      }
    }
  });
});

// konversi ke Rupiah
const rupiah = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};
