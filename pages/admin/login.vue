<template>
    <div>
        <h1>Welcome to admin login</h1>

        <form @submit="login">
            <input type="text" name="email" id="email" placeholder="Email" class="classy-input" v-model="email">
            <input type="password" name="password" id="password" placeholder="Password" class="classy-input"
                v-model="password">
            <button>Login</button>
        </form>
    </div>
</template>

<script lang="ts">
export default {
    data() {
        return {
            email: "",
            password: "",
            session: {}
        }
    },
    methods: {
        async login(e: Event) {
            e.preventDefault()
            const { account } = useAppwrite()
            const { email, password } = this
            console.log(email, password);
            try {
                const session = await account.createEmailSession(email, password)
                console.log(session);
                this.session = session
                if (session) {
                    this.$router.push('/admin')
                }
            } catch (error) {
                console.log(error);
            }
        }
    },
    async mounted() {
        console.log("Admin Login Mounted");

        const { account } = useAppwrite()

        try {
            const session = await account.getSession('current')
            console.log("Session: ", session);

            if (session !== null) {
                console.log("Logged In");
                this.$router.push('/admin')
            }
            else {
                console.log("Not Logged In");
            }
        } catch (error) {
            console.log(error);
        }
    }
}
</script>
