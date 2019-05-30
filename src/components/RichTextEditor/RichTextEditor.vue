<template>
    <div>
        <editor-menu-bar :editor="editor" class="editor">
            <div class="menubar" slot-scope="{ commands, isActive }">

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.bold() }"
                        @click="commands.bold">
                    <i class="fa fa-bold" aria-hidden="true"></i>
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.italic() }"
                        @click="commands.italic">
                    <i class="fa fa-italic" aria-hidden="true"></i>
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.paragraph() }"
                        @click="commands.paragraph">
                    <i class="fa fa-paragraph" aria-hidden="true"></i>
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                        @click="commands.heading({ level: 1 })">
                    H1
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                        @click="commands.heading({ level: 2 })">
                    H2
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                        @click="commands.heading({ level: 3 })">
                    H3
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.bullet_list() }"
                        @click="commands.bullet_list">
                    <i class="fa fa-list" aria-hidden="true"></i>
                </button>

                <button class="menubar__button"
                        :class="{ 'is-active': isActive.ordered_list() }"
                        @click="commands.ordered_list">
                    <i class="fa fa-list-ol" aria-hidden="true"></i>
                </button>


            </div>
        </editor-menu-bar>
        <editor-content :editor="editor"/>

        <!--<hr/>-->
        <!--<div>-->
            <!--Output:-->
            <!--<pre><code>{{ html }}</code></pre>-->
        <!--</div>-->


    </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap';
    import {
        Blockquote,
        CodeBlock,
        HardBreak,
        Heading,
        OrderedList,
        BulletList,
        ListItem,
        TodoItem,
        TodoList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
    } from 'tiptap-extensions';

    export default {
        components: {
            EditorMenuBar,
            EditorContent,
        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Blockquote(),
                        new CodeBlock(),
                        new HardBreak(),
                        new Heading({levels: [1, 2, 3]}),
                        new BulletList(),
                        new OrderedList(),
                        new ListItem(),
                        new TodoItem(),
                        new TodoList(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Link(),
                        new Strike(),
                        new Underline(),
                        new History(),
                    ],
                    content: `Post Content`,
                    onUpdate: ({getJSON, getHTML}) => {
                        const json = getJSON();
                        // this.html = getHTML();
                        const html = getHTML();
                        this.$emit('inputChange', html)
                    },
                }),
            };
        },
        beforeDestroy() {
            this.editor.destroy();
        },
    };
</script>

<style>
    .menubar.editor button {
        background: none;
        border: 0px;
        padding: 5px 10px;
        margin: 0px 5px;
        cursor: pointer;
        border-radius: 4px;
    }

    .menubar.editor button:hover {
        background: #d8d8d8;
    }

    .menubar.editor {
        background: #f7f7f7;
        padding: 5px 0px;
    }

    .ProseMirror {
        border: 1px solid #f5f5f5;
        padding: 10px;
    }
</style>