use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen, PanicOnDefault, AccountId};
use near_sdk::collections::UnorderedMap;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    pub names: UnorderedMap<AccountId, String>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new() -> Self {
        Self {
            names: UnorderedMap::new(b"s".to_vec()),
        }
    }
    
    pub fn hello(&mut self, name: String) -> String { 
        format!("Hello {}!", name)
    }
    
    #[payable]
    pub fn remember_me(&mut self, name: String) -> String {   
        if env::attached_deposit() >= 450000000000000000000 {
            let deposit = (env::attached_deposit() as f64)/(10u128.pow(24) as f64);
            env::log_str(format!("Thanks for the {} NEAR.", deposit).as_str())
        }
        else {
            env::panic_str("You need to deposit at least 0.00045 NEAR in order to use this funtion. Storage is expensive...");
        }
        if name.len() > 15 {
            env::panic_str(format!("I can only remember 15 characters. Your name has {} characters. I'm sorry.", name.len()).as_str());
        }
        self.names.insert(&env::predecessor_account_id(), &name);
        let result = format!("Hello {}! I will remember you.", name);
        env::log_str(result.as_str());
        result
    }
    
    pub fn get_last_message(self, account_id: AccountId) -> String { 
        let name = self.names.get(&account_id);
        if name.is_some(){
            format!("Hello {}!", name.unwrap())
        }
        else{
            "I don't remember you.".to_string()
        }
    }
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-template -- --nocapture
 * Note: 'rust-template' comes from Cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::test_utils::{VMContextBuilder};
    //use near_sdk::test_utils::{get_logs, VMContextBuilder};
    use near_sdk::{testing_env, AccountId};

    // part of writing unit tests is setting up a mock context
    // provide a `predecessor` here, it'll modify the default context
    fn get_context(predecessor: AccountId) -> VMContextBuilder {
        let mut builder = VMContextBuilder::new();
        builder.predecessor_account_id(predecessor);
        builder
    }

    #[test]
    fn check_hello_world() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice1.testnet".to_string());
        // Set up the testing context and unit test environment
        let context = get_context(alice);
        testing_env!(context.build());

        // Set up contract object and call the new method
        let mut contract = Contract::new();
        let result = contract.hello("Alice".to_string());
        assert_eq!(result, "Hello Alice!".to_string(), "Expected correct hello response.");
        //assert_eq!(get_logs(), ["Try again."], "Expected a failure log.");
    }

    #[test]
    fn remember_me_says_hello() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice2.testnet".to_string());
        // Set up the testing context and unit test environment
        let mut context = get_context(alice);
        context.attached_deposit(10u128.pow(22));
        testing_env!(context.build());

        // Set up contract object and call the new method
        let mut contract = Contract::new();
        let result = contract.remember_me("Alice".to_string());
        assert_eq!(result, "Hello Alice! I will remember you.".to_string(), "Expected correct hello response.");
    }

    #[test]
    #[should_panic]
    fn remember_me_without_deposit_should_fail() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice3.testnet".to_string());
        // Set up the testing context and unit test environment
        let context = get_context(alice);
        testing_env!(context.build());

        // Set up contract object and call the new method
        let mut contract = Contract::new();
        let result = contract.remember_me("Alice".to_string());
        assert_eq!(result, "Hello Alice!".to_string(), "Expected correct hello response.");
    }

    #[test]
    #[should_panic]
    fn remember_me_with_to_long_name_should_fail() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice4.testnet".to_string());
        // Set up the testing context and unit test environment
        let mut context = get_context(alice);
        context.attached_deposit(10u128.pow(22));
        testing_env!(context.build());

        // Set up contract object and call the new method
        let mut contract = Contract::new();
        let result = contract.remember_me("AVeryLongNameIndeed".to_string());
        assert_eq!(result, "Hello Alice!".to_string(), "Expected correct hello response.");
    }

    #[test]
    fn remember_me_remembers_name() {
        // Get Alice as an account ID
        let alice = AccountId::new_unchecked("alice5.testnet".to_string());
        // Set up the testing context and unit test environment
        let mut context = get_context(alice);
        context.attached_deposit(10u128.pow(22));
        testing_env!(context.build());
        let alice = AccountId::new_unchecked("alice5.testnet".to_string());

        // Set up contract object and call the new method
        let mut contract = Contract::new();
        contract.remember_me("Alice".to_string());
        let result = contract.get_last_message(alice);
        assert_eq!(result, "Hello Alice!".to_string(), "Expected correct hello response.");
    }
}
