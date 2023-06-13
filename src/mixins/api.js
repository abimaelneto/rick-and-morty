export const apiMixin = {
  methods: {
    myFetch(url, callback) {
      return fetch(url)
        .then((res) => res.json())
        .then(callback);
    },
  },
  data() {
    return {
      teste: "será que deu boa?",
    };
  },
};
