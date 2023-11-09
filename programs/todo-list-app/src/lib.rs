use anchor_lang::prelude::*;

declare_id!("4MaTQUzeDHpRCbQpm1CvNQ7JWkwqFH9L2qbqRxBaZTfw");

#[program]
pub mod todo_list_app {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct AddingTask<'info> {
pub task: Account<'info, Task>,
pub author: Signer<'info>,
pub system_program: Program<'info, System>,
}
