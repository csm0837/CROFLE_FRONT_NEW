<!-- src/views/mypage/ProjectDetail.vue -->
<template>
  <div class="project-detail-page">
    <div class="header">
      <h2>프로젝트 상세 정보</h2>
      <div class="header-buttons">
        <template v-if="project.status === 'reviewing'">
          <button class="btn edit-btn" @click="toggleEdit">
            {{ isEditing ? '수정 완료' : '수정하기' }}
          </button>
          <button class="btn review-btn" @click="requestApproval" :disabled="isEditing">
            검토받기
          </button>
        </template>
        <button class="btn back-btn" @click="$router.push('/mypage/funding-status')">
          목록으로
        </button>
      </div>
    </div>

    <!-- 조회 모드 -->
    <div v-if="!isEditing && project" class="detail-content">


      <!-- 기본 정보 섹션 -->
      <div class="section">
        <h3>기본 정보</h3>
        <div class="info-grid">
          <div class="info-item">
            <span class="label">프로젝트명</span>
            <span class="value">{{ project.name }}</span>
          </div>
          <div class="info-item">
            <span class="label">상태</span>
            <span class="status-badge" :class="project.status">
              {{ getStatusText(project.status) }}
            </span>
          </div>
          <div class="info-item">
            <span class="label">카테고리</span>
            <span class="value">{{ project.category }}</span>
          </div>
          <div class="info-item">
            <span class="label">판매가</span>
            <span class="value">{{ formatPrice(project.price) }}</span>
          </div>
          <div class="info-item">
            <span class="label">할인율</span>
            <span class="value">{{ project.discount }}%</span>
          </div>
          <div class="info-item">
            <span class="label">목표 금액</span>
            <span class="value">{{ formatPrice(project.targetAmount) }}</span>
          </div>
          <div class="info-item">
            <span class="label">현재 펀딩액</span>
            <span class="value">{{ formatPrice(project.currentAmount) }}</span>
          </div>
          <div class="info-item">
            <span class="label">달성률</span>
            <span class="value achievement">{{ project.achievementRate }}%</span>
          </div>
        </div>
      </div>


      <!-- 펀딩 현황 섹션 -->
      <div class="section">
        <h3>펀딩 현황</h3>
        <div class="funding-stats">
          <div class="stat-card">
            <span class="stat-label">총 참여자</span>
            <span class="stat-value">{{ project.totalParticipants }}명</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">평균 펀딩 금액</span>
            <span class="stat-value">{{ formatPrice(project.averageFunding) }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">일일 평균 펀딩액</span>
            <span class="stat-value">{{ formatPrice(project.dailyAverageFunding) }}</span>
          </div>
        </div>
      </div>


        <!-- 등록된 서류 섹션 -->
        <div class="section">
        <h3>등록된 서류</h3>
        <div class="document-list">
          <div v-for="(doc, type) in project.documents" :key="type" class="document-item">
            <span class="doc-name">{{ getDocumentTypeName(type) }}: {{ doc.name }}</span>
            <div class="doc-actions">
              <button class="btn view-btn small" @click="viewDocument(type)">보기</button>
            </div>
          </div>
        </div>
      </div>


      <!-- 상품 정보 섹션 -->
      <div class="section">
        <h3>상품 정보</h3>
        <div class="description">{{ project.description }}</div>
        <div class="image-section">
          <div class="image-group">
            <span class="label">썸네일 이미지</span>
            <img :src="project.thumbnailImage" alt="썸네일" class="product-image" />
          </div>
          <div class="image-group" v-if="project.additionalImages.length">
            <span class="label">추가 이미지</span>
            <div class="additional-images">
              <img 
                v-for="(image, index) in project.additionalImages" 
                :key="index"
                :src="image"
                :alt="'추가 이미지 ' + (index + 1)"
                class="product-image"
              />
            </div>
          </div>
          <div class="image-group">
            <span class="label">상세 이미지</span>
            <img :src="project.contentImage" alt="상세 이미지" class="detail-image" />
          </div>
        </div>
      </div>
    </div>


    <!-- 수정 모드 -->
    <form v-else-if="isEditing && editProject" @submit.prevent="submitProject" class="project-form">
      <div class="form-section">
        <h3>기본 정보</h3>
        <div class="input-group">
          <label for="name">프로젝트 이름</label>
          <input 
            type="text" 
            id="name" 
            v-model="editProject.name" 
            placeholder="프로젝트 이름을 입력하세요"
            required
          />
        </div>

        <div class="input-group">
          <label for="category">카테고리</label>
          <select id="category" v-model="editProject.category" required>
            <option value="">카테고리 선택</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label for="description">상품 설명</label>
          <textarea 
            id="description" 
            v-model="editProject.description" 
            placeholder="상품에 대한 상세한 설명을 입력하세요"
            required
          ></textarea>
        </div>

        <div class="input-group">
          <label for="price">판매가</label>
          <input 
            type="number" 
            id="price" 
            v-model.number="editProject.price" 
            min="0"
            placeholder="상품의 판매 가격을 입력하세요"
            required
          />
        </div>

        <div class="input-group">
          <label for="discount">할인율 (%)</label>
          <input 
            type="number" 
            id="discount" 
            v-model.number="editProject.discount" 
            min="0" 
            max="100"
            placeholder="라이브 방송 시 적용할 할인율을 입력하세요"
          />
        </div>

        <div class="input-group">
          <label for="targetAmount">목표 금액</label>
          <input 
            type="number" 
            id="targetAmount" 
            v-model.number="editProject.targetAmount" 
            min="0"
            placeholder="펀딩 목표 금액을 입력하세요"
            required
          />
        </div>
      </div>

      <div class="form-section">
        <h3>이미지 등록</h3>
        <div class="image-upload-group">
          <label>썸네일 이미지</label>
          <input 
            type="file" 
            @change="handleThumbnailUpload" 
            accept="image/*"
            :required="!editProject.thumbnailImage"
          />
          <img v-if="thumbnailPreview" :src="thumbnailPreview" class="image-preview" />
          <button type="button" class="delete-btn small" v-if="editProject.thumbnailImage" @click="deleteFile('thumbnail')">삭제</button>
        </div>

        <div class="image-upload-group">
          <label>추가 이미지 (최대 5개)</label>
          <input 
            type="file" 
            @change="handleImagesUpload" 
            accept="image/*" 
            multiple
            :disabled="editProject.additionalImages.length >= 5"
          />
          <div class="image-previews">
            <div v-for="(preview, index) in imagePreviews" :key="index" class="image-item">
              <img :src="preview" class="image-preview" />
              <button type="button" class="delete-btn small" @click="deleteAdditionalImage(index)">삭제</button>
            </div>
          </div>
        </div>

        <div class="image-upload-group">
          <label>내용 이미지</label>
          <input 
            type="file" 
            @change="handleContentImageUpload" 
            accept="image/*"
            :required="!editProject.contentImage"
          />
          <img v-if="contentImagePreview" :src="contentImagePreview" class="image-preview" />
          <button type="button" class="delete-btn small" v-if="editProject.contentImage" @click="deleteFile('content')">삭제</button>
        </div>
      </div>

      <div class="form-section">
        <h3>필수 등록 서류</h3>
        <div class="document-upload-group">
          <label>프로젝트 기획서</label>
          <input 
            type="file" 
            @change="handleDocumentUpload('projectPlan')" 
            accept=".pdf,.doc,.docx"
            :required="!editProject.documents.projectPlan"
          />
          <div class="uploaded-doc">
            <small v-if="editProject.documents.projectPlan">
              {{ editProject.documents.projectPlan.name }}
              <button type="button" class="delete-btn small" @click="deleteDocument('projectPlan')">삭제</button>
            </small>
          </div>
        </div>

        <div class="document-upload-group">
          <label>개발 기획서</label>
          <input 
            type="file" 
            @change="handleDocumentUpload('developmentPlan')" 
            accept=".pdf,.doc,.docx"
            :required="!editProject.documents.developmentPlan"
          />
          <div class="uploaded-doc">
            <small v-if="editProject.documents.developmentPlan">
              {{ editProject.documents.developmentPlan.name }}
              <button type="button" class="delete-btn small" @click="deleteDocument('developmentPlan')">삭제</button>
            </small>
          </div>
        </div>

        <div class="document-upload-group">
          <label>개인정보 이용동의서</label>
          <input 
            type="file" 
            @change="handleDocumentUpload('agreement')" 
            accept=".pdf,.doc,.docx"
            :required="!editProject.documents.agreement"
          />
          <div class="uploaded-doc">
            <small v-if="editProject.documents.agreement">
              {{ editProject.documents.agreement.name }}
              <button type="button" class="delete-btn small" @click="deleteDocument('agreement')">삭제</button>
            </small>
          </div>
        </div>

        <div class="document-upload-group">
          <label>추가 서류</label>
          <input 
            type="file" 
            @change="handleDocumentUpload('additional')" 
            accept=".pdf,.doc,.docx"
          />
          <div class="uploaded-doc">
            <small v-if="editProject.documents.additional">
              {{ editProject.documents.additional.name }}
              <button type="button" class="delete-btn small" @click="deleteDocument('additional')">삭제</button>
            </small>
          </div>
        </div>
      </div>

      <div class="form-buttons">
        <button type="button" class="cancel-btn" @click="cancelEdit">
          취소
        </button>
        <button type="submit" class="submit-btn">
          저장
        </button>
      </div>
    </form>

    <div v-else class="loading">
      프로젝트 정보를 불러오는 중...
    </div>

    <!-- 승인 요청 완료 모달 -->
    <div v-if="showApprovalModal" class="modal">
      <div class="modal-content">
        <h3>승인 요청 완료</h3>
        <p>관리자에게 승인 요청되었습니다.</p>
        <button @click="closeApprovalModal" class="close-btn">확인</button>
      </div>
    </div>

    <!-- 성공/실패 모달 -->
    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <h3>수정되었습니다</h3>
        <p>프로젝트 정보가 성공적으로 수정되었습니다.</p>
        <button @click="closeSuccessModal" class="close-btn">확인</button>
      </div>
    </div>
    
    <div v-if="showErrorModal" class="modal">
      <div class="modal-content">
        <h3>수정 실패</h3>
        <p>프로젝트 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.</p>
        <button @click="closeErrorModal" class="close-btn">확인</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectDetail',
  data() {
    return {
      project: null, 
      editProject: null, 
      isEditing: false,
      showApprovalModal: false,
      showSuccessModal: false,
      showErrorModal: false,
      categories: ['생활 가전', '의류', '식품', '기타'], 
      thumbnailPreview: '',
      contentImagePreview: '',
      imagePreviews: [],
      uploadedDocuments: {
        projectPlan: null,
        developmentPlan: null,
        agreement: null,
        additional: null
      }
    };
  },
  created() {
    this.fetchProjectDetails();
  },
  methods: {
    fetchProjectDetails() {
      this.project = {
        id: 1,
        name: '스마트 공기청정기 프로젝트',
        status: 'reviewing', 
        startDate: '2024-03-15',
        endDate: '2024-04-15',
        category: '생활 가전',
        price: 299000,
        discount: 10,
        targetAmount: 10000000,
        currentAmount: 5500000,
        achievementRate: 55,
        totalParticipants: 128,
        averageFunding: 42968,
        dailyAverageFunding: 550000,
        description: '스마트한 기능을 갖춘 신개념 공기청정기입니다. AI 기능을 탑재하여 실내 공기 상태를 실시간으로 감지하고 자동으로 조절합니다.',
        thumbnailImage: '/path/to/thumbnail.jpg',
        contentImage: '/path/to/content.jpg',
        additionalImages: [
          '/path/to/image1.jpg',
          '/path/to/image2.jpg',
          '/path/to/image3.jpg'
        ],
        documents: {
          projectPlan: { name: 'proposal.pdf', url: '/path/to/proposal.pdf' },
          developmentPlan: { name: 'developmentPlan.docx', url: '/path/to/developmentPlan.docx' },
          agreement: { name: 'agreement.pdf', url: '/path/to/agreement.pdf' },
          additional: { name: 'additional.docx', url: '/path/to/additional.docx' }
        },
        broadcasts: [
          {
            id: 1,
            date: '2024-03-20',
            time: '14:00',
            status: 'completed'
          },
          {
            id: 2,
            date: '2024-03-25',
            time: '15:00',
            status: 'upcoming'
          },
          {
            id: 3,
            date: '2024-03-30',
            time: '14:00',
            status: 'upcoming'
          }
        ]
      };
    },

    formatPrice(price) {
      return price.toLocaleString('ko-KR') + '원';
    },

    getStatusText(status) {
      const statusMap = {
        reviewing: '검토중',
        funding: '펀딩중',
        success: '펀딩성공',
        failed: '펀딩실패'
      };
      return statusMap[status];
    },
  
    getBroadcastStatusText(status) {
      const statusMap = {
        completed: '방송완료',
        upcoming: '방송예정',
        cancelled: '방송취소'
      };
      return statusMap[status];
    },

    toggleEdit() {
      if (this.isEditing) {
  
        this.submitProject();
      } else {
        this.editProject = JSON.parse(JSON.stringify(this.project));
        this.uploadedDocuments = {
          projectPlan: this.project.documents.projectPlan || null,
          developmentPlan: this.project.documents.developmentPlan || null,
          agreement: this.project.documents.agreement || null,
          additional: this.project.documents.additional || null
        };
        this.thumbnailPreview = this.project.thumbnailImage;
        this.contentImagePreview = this.project.contentImage;
        this.imagePreviews = [...this.project.additionalImages];
      }
      this.isEditing = !this.isEditing;
    },
    cancelEdit() {
      this.isEditing = false;
      this.editProject = null;
      this.uploadedDocuments = {
        projectPlan: null,
        developmentPlan: null,
        agreement: null,
        additional: null
      };
      this.thumbnailPreview = '';
      this.contentImagePreview = '';
      this.imagePreviews = [];
    },
    requestApproval() {
      this.showApprovalModal = true;
    },
    closeApprovalModal() {
      this.showApprovalModal = false;
    },
    closeSuccessModal() {
      this.showSuccessModal = false;
      this.isEditing = false; 
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
    handleThumbnailUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.editProject.thumbnailImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.thumbnailPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleContentImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.editProject.contentImage = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.contentImagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    handleImagesUpload(event) {
      const files = event.target.files;
      if (files && files.length > 0) {
        Array.from(files).forEach((file) => {
          if (this.imagePreviews.length < 5) {
            this.editProject.additionalImages.push(file);
            const reader = new FileReader();
            reader.onload = (e) => {
              this.imagePreviews.push(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        });
      }
    },

    handleDocumentUpload(type) {
      return (event) => {
        const file = event.target.files[0];
        if (file) {
          this.editProject.documents[type] = file;
          this.uploadedDocuments[type] = file;
        }
      };
    },

    deleteFile(type) {
      if (type === 'thumbnail') {
        this.editProject.thumbnailImage = null;
        this.thumbnailPreview = '';
      } else if (type === 'content') {
        this.editProject.contentImage = null;
        this.contentImagePreview = '';
      }
    },
    deleteAdditionalImage(index) {
      this.editProject.additionalImages.splice(index, 1);
      this.imagePreviews.splice(index, 1);
    },
    deleteDocument(type) {
      this.editProject.documents[type] = null;
      this.uploadedDocuments[type] = null;
    },
  
    getDocumentTypeName(type) {
      const docTypeMap = {
        projectPlan: '프로젝트 기획서',
        developmentPlan: '개발 기획서',
        agreement: '개인정보 이용동의서',
        additional: '추가 서류'
      };
      return docTypeMap[type] || '기타 문서';
    },
  
    viewDocument(type) {
   
      const doc = this.project.documents[type];
      if (doc && doc.url) {
        window.open(doc.url, '_blank');
      } else {
        alert('문서를 찾을 수 없습니다.');
      }
    },
 
    submitProject() {
      try {

        if (this.editProject.thumbnailImage instanceof File) {
          this.project.thumbnailImage = URL.createObjectURL(this.editProject.thumbnailImage);
        } else {
          this.project.thumbnailImage = this.project.thumbnailImage; 
        }

        if (this.editProject.contentImage instanceof File) {
          this.project.contentImage = URL.createObjectURL(this.editProject.contentImage);
        } else {
          this.project.contentImage = this.project.contentImage;
        }

        if (this.editProject.additionalImages.length > 0) {
          this.project.additionalImages = this.editProject.additionalImages.map(file => URL.createObjectURL(file));
        } else {
          this.project.additionalImages = [];
        }

    
        Object.keys(this.editProject.documents).forEach(type => {
          const file = this.editProject.documents[type];
          if (file instanceof File) {
            this.project.documents[type] = {
              name: file.name,
              url: URL.createObjectURL(file) 
            };
          } else {
            this.project.documents[type] = this.project.documents[type] || null;
          }
        });

        this.project.name = this.editProject.name;
        this.project.category = this.editProject.category;
        this.project.description = this.editProject.description;
        this.project.price = this.editProject.price;
        this.project.discount = this.editProject.discount;
        this.project.targetAmount = this.editProject.targetAmount;

        this.showSuccessModal = true;
      } catch (error) {
        console.error('프로젝트 수정 실패:', error);
        this.showErrorModal = true;
      }
    },
  
    cancelRegistration() {
      this.$router.push('/mypage/funding-status');
    }
  }
};
</script>

<style scoped>

.btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.edit-btn {
  background-color: #fff;
  border: 1px solid #007bff;
  color: #007bff;
}

.edit-btn:hover {
  background-color: #007bff;
  color: #fff;
}

.review-btn {
  background-color: #007bff;
  border: 1px solid #007bff;
  color: #fff;
}

.review-btn:hover {
  background-color: #0056b3;
}

.back-btn {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
}

.back-btn:hover {
  background-color: #e9ecef;
}

.file-edit-group,
.image-upload-group,
.document-upload-group {
  margin-bottom: 2rem;
}

.file-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.file-content,
.image-upload-group,
.document-upload-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.preview-image {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.image-list,
.image-previews {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
}

.delete-btn {
  background-color: #dc3545;
  border: 1px solid #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.delete-btn.small {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
}

.view-btn {
  background-color: #6c757d;
  border: 1px solid #6c757d;
  color: white;
}

.view-btn:hover {
  background-color: #5a6268;
}

.document-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.document-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 4px;
}

.doc-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.doc-name {
  font-size: 0.9rem;
  color: #495057;
}

.uploaded-doc {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.uploaded-doc button {
  background: none;
  border: none;
  color: #dc3545;
  cursor: pointer;
}

.project-detail-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

h3 {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label {
  color: #666;
  font-size: 0.9rem;
}

.value {
  font-size: 1.1rem;
  color: #333;
}

.achievement {
  color: #2e7d32;
  font-weight: bold;
}

.status-badge {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
}

.status-badge.reviewing { background-color: #e9ecef; color: #495057; }
.status-badge.funding { background-color: #e3f2fd; color: #1976d2; }
.status-badge.success { background-color: #e8f5e9; color: #2e7d32; }
.status-badge.failed { background-color: #ffebee; color: #c62828; }

.funding-stats,
.inquiry-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  display: block;
  color: #666;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.stat-value.highlight {
  color: #d32f2f;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.schedule-status {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.schedule-status.completed { background-color: #e8f5e9; color: #2e7d32; }
.schedule-status.upcoming { background-color: #e3f2fd; color: #1976d2; }
.schedule-status.cancelled { background-color: #ffebee; color: #c62828; }

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .schedule-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}

.project-form {
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input-group label {
  font-weight: bold;
  color: #333;
}

.input-group input,
.input-group select,
.input-group textarea {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.image-upload-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.image-preview {
  max-width: 200px;
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.image-previews {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.image-item {
  position: relative;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #e9ecef;
}

.submit-btn {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #218838;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  text-align: center;
}

.success {
  color: #28a745;
  font-weight: bold;
  margin: 1rem 0;
}

.failure {
  color: #dc3545;
  font-weight: bold;
  margin: 1rem 0;
}

.reject-reason {
  color: #666;
  margin: 1rem 0;
}

.payment-btn, .close-btn {
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.payment-btn {
  background-color: #28a745;
  color: white;
}

.close-btn {
  background-color: #6c757d;
  color: white;
}
</style>