import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { TodoListApp } from "../target/types/todo_list_app";
import { assert } from "chai";

describe("todo-list-app", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TodoListApp as Program<TodoListApp>;
  const author = program.provider as anchor.AnchorProvider;

  it("can create a task", async () => {
    const task = anchor.web3.Keypair.generate();
    const tx = await program.methods.addingTask("that's great Bprime")
    .accounts({
      task: task.publicKey,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .signers([task])
    .rpc();
    console.log("Behold! your transaction signature", tx);

    const taskAccount = await program.account.task.fetch(task.publicKey);
    console.log("your task", taskAccount);

    assert.equal(
      taskAccount.author.toBase58(),
      author.wallet.publicKey.toBase58()
    );
    assert.equal(taskAccount.text, "that's great Bprime");
    assert.equal(taskAccount.isDone, false);
    assert.ok(taskAccount.createdAt);
    assert.ok(taskAccount.updatedAt);
  });

  });
