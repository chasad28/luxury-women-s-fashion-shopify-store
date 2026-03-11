import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import MixinStorage "blob-storage/Mixin";

actor {
  include MixinStorage();

  // State
  let subscriberAccounts = Map.empty<Text, Subscriber>();

  // Product Management
  let products = Map.empty<Nat, Product>();
  var nextProductId = 0;

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    price : Float;
    category : Text;
    colors : [Text];
    images : [Text];
    stock : Nat;
    isBestSeller : Bool;
    isNewArrival : Bool;
  };

  module Product {
    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      compareProducts(product1, product2, "price");
    };
  };

  type Review = {
    productId : Nat;
    reviewer : Text;
    rating : Nat;
    comment : Text;
    timestamp : Time.Time;
  };

  type Subscriber = {
    email : Text;
    timestamp : Time.Time;
  };

  module Subscriber {
    public func compareByTimestamp(subscriber1 : Subscriber, subscriber2 : Subscriber) : Order.Order {
      Int.compare(subscriber1.timestamp, subscriber2.timestamp);
    };
  };

  // Helper function to compare products by a specific field
  func compareProducts(product1 : Product, product2 : Product, field : Text) : Order.Order {
    switch (field) {
      case ("price") {
        if (product1.price < product2.price) { #less } else {
          if (product1.price > product2.price) { #greater } else { #equal };
        };
      };
      case ("stock") {
        Nat.compare(
          product1.stock,
          product2.stock,
        );
      };
      case ("bestSeller") {
        if (product1.isBestSeller == product2.isBestSeller) {
          #equal;
        } else if (product1.isBestSeller) {
          #less;
        } else {
          #greater;
        };
      };
      case ("category") {
        Text.compare(
          product1.category,
          product2.category,
        );
      };
      case (_) { #equal };
    };
  };

  // Query: Get All Products (with simplified filtering)
  public query ({ caller }) func getAllProducts(
    category : ?Text,
    isBestSeller : ?Bool,
    isNewArrival : ?Bool,
    sortBy : ?Text,
    reverse : ?Bool,
  ) : async [Product] {
    var productsIter = products.values();

    // Filter by category if provided
    switch (category) {
      case (null) {};
      case (?cat) {
        productsIter := productsIter.filter(
          func(p) { p.category == cat }
        );
      };
    };

    // Filter by best seller if provided
    switch (isBestSeller) {
      case (null) {};
      case (?best) {
        productsIter := productsIter.filter(
          func(p) { p.isBestSeller == best }
        );
      };
    };

    // Filter by new arrival if provided
    switch (isNewArrival) {
      case (null) {};
      case (?new) {
        productsIter := productsIter.filter(
          func(p) { p.isNewArrival == new }
        );
      };
    };

    let sorted = switch (sortBy) {
      case (null) { productsIter.toArray() };
      case (?criteria) {
        productsIter.toArray().sort(
          func(a, b) {
            if (reverse == ?true) {
              compareProducts(b, a, criteria);
            } else {
              compareProducts(a, b, criteria);
            };
          }
        );
      };
    };

    sorted;
  };

  // Query: Get Single Product
  public query ({ caller }) func getProductById(id : Nat) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  // Update: Submit Review
  public shared ({ caller }) func submitReview(productId : Nat, reviewer : Text, rating : Nat, comment : Text) : async () {
    switch (products.get(productId)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let review : Review = {
          productId;
          reviewer;
          rating;
          comment;
          timestamp = Time.now();
        };
        Runtime.trap("Review submitted successfully for testing purposes!")
      };
    };
  };

  // Newsletter Subscription
  public shared ({ caller }) func subscribeEmail(email : Text) : async () {
    if (subscriberAccounts.containsKey(email)) {
      Runtime.trap("Email already subscribed. (For testing purposes!)");
    };

    let subscriber : Subscriber = {
      email;
      timestamp = Time.now();
    };
    subscriberAccounts.add(email, subscriber);
  };

  // Query: Get All Subscribers
  public query ({ caller }) func getAllSubscribers() : async [Subscriber] {
    subscriberAccounts.values().toArray().sort(Subscriber.compareByTimestamp);
  };

  // Update Functions for Products (for testing purposes)
  public shared ({ caller }) func addProduct(
    name : Text,
    description : Text,
    price : Float,
    category : Text,
    colors : [Text],
    images : [Text],
    stock : Nat,
    isBestSeller : Bool,
    isNewArrival : Bool,
  ) : async () {
    let product : Product = {
      id = nextProductId;
      name;
      description;
      price;
      category;
      colors;
      images;
      stock;
      isBestSeller;
      isNewArrival;
    };
    products.add(nextProductId, product);
    nextProductId += 1;
  };
};
