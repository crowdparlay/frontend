import http from "../common";
import ITweet from "../types/Tweet"

export default class TweetService {
  static url = "/tweets"

  static getAll() {
    return http.get<ITweet[]>(TweetService.url);
  }

  static create(tweet: ITweet) {
    return http.post<ITweet>(TweetService.url, tweet);
  }
}