// Copyright (c) Konstantin Komelin and other contributors
// SPDX-License-Identifier: MIT

/// Module: greeting
module greeting::greeting;

use std::string::{utf8, String};
use sui::display;
use sui::event::emit;
use sui::package;
use sui::random::{Random, new_generator};

// === Imports ===

// === Constants ===

const NoEmojiIndex: u8 = 0;
const MinEmojiIndex: u8 = 1;
const MaxEmojiIndex: u8 = 64;

// === Errors ===

const EEmptyName: u64 = 0;

// === Structs ===

public struct Greeting has key {
    id: UID,
    name: String,
    emoji: u8,
}

/// One-Time-Witness for the module.
public struct GREETING has drop {}

// === Events ===

/// Emitted when the greeting is created.
public struct EventGreetingCreated has copy, drop {
    greeting_id: ID,
}

/// Emitted when the Greeting is set.
public struct EventGreetingSet has copy, drop {
    greeting_id: ID,
}

/// Emitted when the Greeting is reset.
public struct EventGreetingReset has copy, drop {
    greeting_id: ID,
}

// === Initializer ===

/// In the module initializer one claims the `Publisher` object
/// to then create a `Display`. The `Display` is initialized with
/// a set of fields (but can be modified later) and published via
/// the `update_version` call.
///
/// Keys and values are set in the initializer but could also be
/// set after publishing if a `Publisher` object was created.
///
/// Implements One Time Witness pattern.
fun init(otw: GREETING, ctx: &mut TxContext) {
    let keys = vector[
        utf8(b"name"),
        // utf8(b"link"),
        utf8(b"image_url"),
        utf8(b"description"),
        utf8(b"project_url"),
        utf8(b"creator"),
        utf8(b"license"),
    ];

    let values = vector[
        // For `name`, we can use the `Greetings.name` property.
        utf8(b"Greetings to {name}"),
        // For `link`, one can build a URL using an `id` property.
        // utf8(b"https://demo.sui-dapp-starter.dev/{id}"),
        // For `image_url`, use an IPFS template + image url or a Walrus url like https://suidappstarter.walrus.site/emoji/{emoji}.svg.
        utf8(b"https://demo.sui-dapp-starter.dev/emoji/{emoji}.svg"),
        // Description is static for all `Greeting` objects.
        utf8(b"Demonstrates Sui Object Display feature"),
        // Project URL is usually static.
        utf8(b"https://demo.sui-dapp-starter.dev"),
        // Creator field can be any.
        utf8(b"Sui dApp Starter"),
        // SVG emojis from https://github.com/twitter/twemoji are used, so it's necessary to provide the license info.
        utf8(
            b"Graphics borrowed from https://github.com/twitter/twemoji and licensed under CC-BY 4.0: https://creativecommons.org/licenses/by/4.0/",
        ),
    ];

    // Claim the `Publisher` for the package.
    let publisher = package::claim(otw, ctx);

    // Get a new `Display` object for the `Greeting` type.
    let mut display = display::new_with_fields<Greeting>(
        &publisher,
        keys,
        values,
        ctx,
    );

    // Commit first version of `Display` to apply changes.
    display::update_version(&mut display);

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

/// Create and share a Greeting object.
public fun create(ctx: &mut TxContext) {
    // Create the Greeting object.
    let greeting = new(ctx);

    emit(EventGreetingCreated {
        greeting_id: greeting.id.to_inner(),
    });

    // Share the Greeting object with everyone.
    transfer::transfer(greeting, ctx.sender());
}

// === Public-Mutative Functions ===

/// Resets the greeting.
public fun reset_greeting(g: &mut Greeting) {
    g.name = b"".to_string();
    g.emoji = NoEmojiIndex;

    let greeting_id = g.id.to_inner();

    emit(EventGreetingReset {
        greeting_id,
    });
}

// === Public-View Functions ===

/// Returns the name of currently greeted person.
public fun name(g: &Greeting): String {
    g.name
}

/// Returns the emoji of current greeting.
public fun emoji(g: &Greeting): u8 {
    g.emoji
}

// === Private Functions ===

/// Sets the name of currently greeted person and chooses a random emoji for them.
///
/// The function is defined as private entry to prevent calls from other Move functions. (If calls from other
/// functions are allowed, the calling function might abort the transaction depending on the winner.)
/// Gas based attacks are not possible since the gas cost of this function is independent of the winner.
entry fun set_greeting(g: &mut Greeting, name: String, r: &Random, ctx: &mut TxContext) {
    assert!(name != b"".to_string(), EEmptyName);

    let mut generator = r.new_generator(ctx);
    let emoji = generator.generate_u8_in_range(MinEmojiIndex, MaxEmojiIndex);

    // debug::print(g);
    g.name = name;
    g.emoji = emoji;
    // debug::print(g);

    let greeting_id = g.id.to_inner();

    emit(EventGreetingSet {
        greeting_id,
    });
}

/// Create a new empty Greetings object.
fun new(ctx: &mut TxContext): Greeting {
    Greeting {
        id: object::new(ctx),
        name: b"".to_string(),
        emoji: NoEmojiIndex,
    }
}

// === Test Functions ===

#[test_only]
// The `init` is not run in tests, and normally a test_only function is
// provided so that the module can be initialized in tests. Having it public
// is important for tests located in other modules.
public fun init_for_testing(ctx: &mut TxContext) {
    init(GREETING {}, ctx);
}

#[test_only]
/// Create a new Greeting for tests.
public fun new_for_testing(name: String, ctx: &mut TxContext): Greeting {
    let mut greeting = new(ctx);
    greeting.name = name;

    greeting
}

#[test_only]
/// Returns the MaxEmojiIndex constant value.
public fun no_emoji_index(): u8 {
    NoEmojiIndex
}

#[test_only]
/// Returns the MaxEmojiIndex constant value.
public fun min_emoji_index(): u8 {
    MinEmojiIndex
}

#[test_only]
/// Returns the MaxEmojiIndex constant value.
public fun max_emoji_index(): u8 {
    MaxEmojiIndex
}
