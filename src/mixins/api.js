export const apiMixin = {
  methods: {
    myFetch(url, callback) {
      this.loading = true;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.loading = false;
          callback(data);
        });
    },
    close() {
      this.error = "";
    },
    paginate(target, getSomething) {
      getSomething(target == "next" ? this.next : this.prev);
    },
  },
  data() {
    return {
      error: "",
      loading: false,
      next: "",
      prev: "",
    };
  },
};
