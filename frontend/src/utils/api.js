class Api {
  constructor(options) {
    this.options = options;
  }

  async fetchData(url, method = "GET", body = null) {
    const token = localStorage.getItem("jwt");
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const requestOptions = {
      method: method,
      headers: headers,
    };

    if (body) {
      requestOptions.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserInfo(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async setUserInfo(nameInput, aboutMeInput, endPoint) {
    const body = {
      name: nameInput,
      about: aboutMeInput,
    };

    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`,
        "PATCH",
        body
      );
      return result;
    } catch (error) {
      console.error("Error editing user info:", error);
      throw error;
    }
  }

  async getInitialCards(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async setUserPicture(profilePictureInput, endPoint) {
    const body = { avatar: profilePictureInput };

    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`,
        "PATCH",
        body
      );
      return result;
    } catch (error) {
      console.error("Error setting user picture:", error);
      throw error;
    }
  }

  async likeCard(endPoint) {
    const result = await this.fetchData(
      `${this.options.address}/${endPoint}`,
      "PUT"
    );
    return result;
  }

  async deleteLike(endPoint) {
    const result = await this.fetchData(
      `${this.options.address}/${endPoint}`,
      "DELETE"
    );
    return result;
  }

  async changeLikeCardStatus(cardId, like) {
    if (like) {
      return this.likeCard(`cards/likes/${cardId}`);
    } else {
      return this.deleteLike(`cards/likes/${cardId}`);
    }
  }

  async setCard(newCardNameInput, newCardLinkInput, endPoint) {
    const body = {
      name: newCardNameInput,
      link: newCardLinkInput,
    };

    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`,
        "POST",
        body
      );
      return result;
    } catch (error) {
      console.error("Error setting card:", error);
      throw error;
    }
  }

  async deleteCard(endPoint) {
    try {
      const result = await this.fetchData(
        `${this.options.address}/${endPoint}`,
        "DELETE"
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

const api = new Api({
  address: "https://api.aroundEsquivelS.chickenkiller.com",
});

export default api;
