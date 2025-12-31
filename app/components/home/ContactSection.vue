<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const formData = reactive({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

onMounted(() => {
  props.data.fields.forEach((field) => {
    formData[field.name] = field.type === 'checkbox' ? false : ''
  })
  formData.privacyConsent = false
})

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  isSubmitted.value = true

  setTimeout(() => {
    isSubmitted.value = false
    Object.keys(formData).forEach((key) => {
      formData[key] = typeof formData[key] === 'boolean' ? false : ''
    })
  }, 3000)
}
</script>

<template>
  <section
    class="contact-section section"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <div class="container">
      <header class="section-header">
        <h2 class="section-header__title">
          {{ props.data.title }}
        </h2>
        <p
          v-if="props.data.subtitle"
          class="section-header__subtitle"
        >
          {{ props.data.subtitle }}
        </p>
      </header>

      <form
        class="contact-section__form"
        @submit.prevent="handleSubmit"
      >
        <div class="contact-section__fields">
          <div
            v-for="field in props.data.fields"
            :key="field.id"
            class="form-group"
          >
            <label
              :for="field.id"
              class="form-label"
            >
              {{ field.label }}
              <span
                v-if="field.required"
                class="form-label__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>

            <input
              v-if="['text', 'email', 'tel'].includes(field.type)"
              :id="field.id"
              v-model="formData[field.name]"
              :type="field.type"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :aria-describedby="field.ariaDescribedBy"
              class="form-input"
            />

            <textarea
              v-else-if="field.type === 'textarea'"
              :id="field.id"
              v-model="formData[field.name]"
              :name="field.name"
              :placeholder="field.placeholder"
              :required="field.required"
              :aria-describedby="field.ariaDescribedBy"
              class="form-textarea"
            />

            <select
              v-else-if="field.type === 'select'"
              :id="field.id"
              v-model="formData[field.name]"
              :name="field.name"
              :required="field.required"
              :aria-describedby="field.ariaDescribedBy"
              class="form-select"
            >
              <option
                v-for="option in field.options"
                :key="option.value"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>

            <p
              v-if="field.helpText"
              :id="field.ariaDescribedBy"
              class="form-help"
            >
              {{ field.helpText }}
            </p>
          </div>
        </div>

        <div class="contact-section__consent">
          <div class="form-checkbox">
            <input
              :id="props.data.privacyConsent.id"
              v-model="formData.privacyConsent"
              type="checkbox"
              name="privacyConsent"
              :required="props.data.privacyConsent.required"
              :aria-describedby="props.data.privacyConsent.ariaDescribedBy"
            />
            <label :for="props.data.privacyConsent.id">
              {{ props.data.privacyConsent.label }}
              <span
                v-if="props.data.privacyConsent.required"
                class="form-label__required"
                aria-hidden="true"
              >
                *
              </span>
            </label>
          </div>
          <p
            v-if="props.data.privacyConsent.helpText"
            :id="props.data.privacyConsent.ariaDescribedBy"
            class="form-help"
          >
            {{ props.data.privacyConsent.helpText }}
          </p>
        </div>

        <div class="contact-section__submit">
          <button
            type="submit"
            :disabled="isSubmitting"
            :aria-label="props.data.submitButton.ariaLabel ?? props.data.submitButton.label"
            :class="[
              'btn',
              `btn--${props.data.submitButton.variant ?? 'primary'}`,
              'contact-section__submit-btn'
            ]"
          >
            <span v-if="isSubmitting">전송 중...</span>
            <span v-else-if="isSubmitted">전송 완료!</span>
            <span v-else>{{ props.data.submitButton.label }}</span>
          </button>
        </div>

        <div
          v-if="isSubmitted"
          class="contact-section__success"
          role="alert"
          aria-live="polite"
        >
          문의가 성공적으로 전송되었습니다. 빠른 시일 내에 답변 드리겠습니다.
        </div>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.contact-section {
  background-color: $color-background-secondary;

  &__form {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    background-color: $color-surface;
    border: 1px solid $color-border-light;
    border-radius: $radius-xl;
    padding: $space-8;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: $form-gap;
  }

  &__consent {
    margin-top: $space-6;
    padding-top: $space-6;
    border-top: 1px solid $color-border-light;
  }

  &__submit {
    margin-top: $space-6;
  }

  &__submit-btn {
    width: 100%;
  }

  &__success {
    margin-top: $space-4;
    padding: $space-4;
    text-align: center;
    font-size: $font-size-sm;
    color: $success-700;
    background-color: $success-50;
    border-radius: $radius-md;
  }
}

.form-label__required {
  color: $error-500;
  margin-left: $space-0-5;
}
</style>
